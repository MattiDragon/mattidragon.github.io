function getModrinthLink(modid, releaseChannel, processor) {
	fetch("https://api.modrinth.com/api/v1/mod/" + modid + "/version")
		.then(response => response.json())
		.then(data => {
			for (let i=0; i<data.length; i++) {
				let version = data[i];
				if (version.version_type === releaseChannel) {
					let files = version.files;
					
					let candidate = files[0];
					
					for (let j=0; j<files.length; j++) 
						candidate = files[j].primary ? candidate = files[j] : candidate;
					
					processor(candidate.url);
					return;
				}
			}
			console.warn("Could not get download link for " + modid + " on release channel " + releaseChannel);
		});
}