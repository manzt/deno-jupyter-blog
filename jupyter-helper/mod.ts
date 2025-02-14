// @ts-types="@types/react-dom/server";
import * as ReactDOM from "react-dom/server";
import * as anywidget from "@anywidget/deno";
import * as base64 from "@std/encoding/base64";
import * as linkedom from "linkedom";

/**
 * A parsed HTML document for rendering Observable Plot's with Deno.
 */
export const document: globalThis.Document =
  linkedom.parseHTML("<html></html>").document;

/**
 * Renders a React node as an HTML string for display in Jupyter.
 *
 * Note: This only supports server-side rendering (SSR). Hooks and stateful
 * components cannot be used.
 *
 * @example Usage
 * ```tsx
 * import * as React from "npm:react";
 * import { render, document } from "jsr:@manzt/jupyter";
 *
 * render(<h1>Hello, Jupyter!</h1>);
 * ```
 *
 * @param reactNode - The React node to render.
 * @returns A Jupyter-compatible display object.
 */
export function render(
  reactNode: import("react").ReactNode,
): Deno.jupyter.Displayable {
  return {
    [Deno.jupyter.$display]() {
      return {
        "text/html": ReactDOM.renderToString(reactNode),
      };
    },
  };
}

// Widgets

// Types for frontend libs included below
declare const $base64: typeof import("@std/encoding/base64");
declare const $agGrid: typeof import("ag-grid-community");
declare const $flech: typeof import("@uwdata/flechette");
declare const $mosaic: typeof import("@uwdata/mosaic-core");
declare const $quak: typeof import("@manzt/quak");

/**
 * Display a Polars DataFrame as an interactive agGrid.
 *
 * @example Usage
 * ```ts
 * import * as pl from "npm:nodejs-polars";
 * import { agGrid } from "jsr:@manzt/jupyter-helper";
 *
 * let response = await fetch("https://raw.githubusercontent.com/uwdata/mosaic/refs/heads/main/data/penguins.csv");
 * let df = pl.readCSV(await response.text());
 * agGrid(df);
 * ```
 *
 * @param df The DataFrame to display
 * @returns A "live" anywidget instance
 */
export function agGrid(df: import("nodejs-polars").DataFrame): anywidget.Model<{
  ipc: string;
}> {
  return anywidget.widget({
    state: {
      // TODO: Jupyter Widgets support binary data, but I'm not sure if it's implemented in Deno yet
      ipc: base64.encodeBase64(df.writeIPC()),
      _css: "https://esm.sh/ag-grid-community@33.0.4/styles/ag-grid.css",
    },
    imports: `
import * as $agGrid from "https://esm.sh/ag-grid-community@33.0.4";
import * as $flech from "https://esm.sh/@uwdata/flechette@1.1.2";
import * as $base64 from "https://esm.sh/jsr/@std/encoding@1.0.7/base64";
    `,
    render: ({ model, el }) => {
      $agGrid.ModuleRegistry.registerModules([$agGrid.AllCommunityModule]);
      el.style.height = "400px";
      let bytes = $base64.decodeBase64(model.get("ipc"));
      let table = $flech.tableFromIPC(bytes);
      $agGrid.createGrid(el, {
        columnDefs: table.names.map((field) => ({ field })),
        rowData: table.toArray(),
        pagination: true,
      });
    },
  });
}

/**
 * Display a Polars DataFrame as an interactive quak data table.
 *
 * @example Usage
 * ```ts
 * import * as pl from "npm:nodejs-polars";
 * import { quak } from "jsr:@manzt/jupyter-helper";
 *
 * let response = await fetch("https://raw.githubusercontent.com/uwdata/mosaic/refs/heads/main/data/penguins.csv");
 * let df = pl.readCSV(await response.text());
 * quak(df)
 * ```
 *
 * @param df The DataFrame to display
 * @returns A "live" anywidget instance
 */
export function quak(
  df: import("nodejs-polars").DataFrame,
): anywidget.Model<{ parquet: string }> {
  return anywidget.widget({
    // TODO: Jupyter Widgets support binary data, but I'm not sure if it's implemented in Deno yet
    state: { parquet: base64.encodeBase64(df.writeParquet()) },
    imports: `
import * as $mosaic from "https://esm.sh/@uwdata/mosaic-core@~0.11?bundle";
import * as $base64 from "https://esm.sh/jsr/@std/encoding@1.0.7/base64";
import * as $quak from "https://esm.sh/jsr/@manzt/quak@0.0.2";
    `,
    render: async ({ model, el }) => {
      let connector = $mosaic.wasmConnector();
      let db = await connector.getDuckDB();
      let coordinator = new $mosaic.Coordinator();
      coordinator.databaseConnector(connector);

      let bytes = $base64.decodeBase64(model.get("parquet"));
      await db.registerFileBuffer("df.parquet", bytes);
      await coordinator.exec([
        `CREATE OR REPLACE TABLE "df" AS SELECT * FROM "df.parquet"`,
      ]);

      let dt = await $quak.datatable("df", { coordinator, height: 400 });
      el.appendChild(dt.node());

      let div = document.createElement("div");
      div.style.height = "435px";
      div.appendChild(dt.node());

      el.appendChild(div);
    },
  });
}
