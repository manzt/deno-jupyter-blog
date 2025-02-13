# jupyter blog

Ensure you have the Jupyter kernel installed

```sh
deno jupyter --install
```

For **VS Code**, you should be able to open the notebook directly (see
[Deno docs](https://docs.deno.com/runtime/reference/cli/jupyter/) to enable the
kernel).

```sh
code blog.ipynb
```

For **Jupyter Lab**, there is additional setup:

Please ensure to have [uv](https://github.com/astral-sh/uv) installed.

```sh
uv venv
source .venv/bin/activate
# install anywidget's frontend for the Jupyter enviroment (not required for VS Code)
deno run jsr:@anywidget/deno/install
uv pip install jupyterlab # jupyterlab-vim
```

```sh
uv run jupyter lab
```
