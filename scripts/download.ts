async function download(
	baseUrl = new URL(
		"https://github.com/NationalGalleryOfArt/opendata/raw/refs/heads/main/data/",
	),
) {
	let fileNames = [
		"alternative_identifiers.csv",
		"constituents.csv",
		"constituents_altnames.csv",
		"constituents_text_entries.csv",
		"locations.csv",
		"media_items.csv",
		"object_associations.csv",
		"objects.csv",
		"objects_constituents.csv",
		"objects_dimensions.csv",
		"objects_historical_data.csv",
		"objects_terms.csv",
		"objects_text_entries.csv",
		"preferred_locations.csv",
		"preferred_locations_tms_locations.csv",
		"published_images.csv",
	];
	let dataDirectory = new URL("../data/", import.meta.url);
	await Deno.mkdir(dataDirectory).catch(() => {});
	await Promise.all(
		fileNames.map(async (fileName) => {
			let filePath = new URL(fileName, dataDirectory);
			let file = await Deno.open(filePath, { create: true, write: true });
			let response = await fetch(new URL(fileName, baseUrl));
			response.body?.pipeTo(file.writable);
			console.log(`downloaded ${fileName}`);
		}),
	);
}

if (import.meta.main) {
	await download();
}
