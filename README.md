# jupyter blog

Ensure you have the Jupyter kernel installed

```sh
deno jupyter --install
```

For **VS Code**, you should be able to open the notebook directly (see
[Deno docs](https://docs.deno.com/runtime/reference/cli/jupyter/) to enable the
kernel).

```sh
code post.ipynb
```

For **Jupyter Lab**, please ensure to have [uv](https://github.com/astral-sh/uv)
installed. Then, launch the notebook using the
[juv](https://github.com/manzt/juv) CLI:

```sh
uvx juv run --with=anywidget --jupyter=lab post.ipynb
```

The `--with=anywidget` flag ensures JupyterLab loads the required front-end
extension for interactive [anywidgets](https://github.com/manzt/anywidget) (e.g.
agrid, quak). This isn't needed in VS Code, where these assets load from a CDN
instead of the local file system.
