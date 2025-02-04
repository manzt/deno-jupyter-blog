import * as pl from "npm:nodejs-polars@0.18.0";

let baseUrl = new URL(
	"https://github.com/NationalGalleryOfArt/opendata/raw/refs/heads/main/data/",
);

export let files = {
	alternative_identifiers: "alternative_identifiers.csv",
	constituents: "constituents.csv",
	constituents_altnames: "constituents_altnames.csv",
	constituents_text_entries: "constituents_text_entries.csv",
	locations: "locations.csv",
	media_items: "media_items.csv",
	media_relationships: "media_relationships.csv",
	object_associations: "object_associations.csv",
	objects: "objects.csv",
	objects_constituents: "objects_constituents.csv",
	objects_dimensions: "objects_dimensions.csv",
	objects_historical_data: "objects_historical_data.csv",
	objects_terms: "objects_terms.csv",
	objects_text_entries: "objects_text_entries.csv",
	preferred_locations: "preferred_locations.csv",
	preferred_locations_tms_locations: "preferred_locations_tms_locations.csv",
	published_images: "published_images.csv",
} as const;

async function download() {
	let dataDirectory = new URL("data/", import.meta.url);
	await Deno.mkdir(dataDirectory).catch(() => {});
	await Promise.all(
		Object.values(files).map(async (fileName) => {
			let destinationUrl = new URL(fileName, dataDirectory);
			let file = await Deno.open(destinationUrl, { create: true, write: true });
			let response = await fetch(new URL(fileName, baseUrl));
			response.body?.pipeTo(file.writable);
			console.log(`downloaded ${fileName}`);
		}),
	);
}

if (import.meta.main) {
	await download();
}
