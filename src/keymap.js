exports.initializeKeymap = (globalShortcut, keymap) => {
	
	keymap.forEach((x) => {
		if (!x.shorcut || !x.function) {
			console.log(`Keeptron: Shortcut ${x.shorcut} not registered for function ${x.function}`)
			return;
		}

		var ret = globalShortcut.register(x.shorcut, x.function)

		if (ret && globalShortcut.isRegistered(x.shorcut)) {
			console.log(`Keeptron: Shortcut ${x.shorcut} registered properly`)
		} else {
			console.log(`Keeptron: Shortcut ${x.shorcut} not registered`)
		}
		
	})
}