/**
 * Classe permettant de gérer le stockage des fichiers
 * mode singleton
 * @returns
 */
function FileDataManager() {
	// singleton filetransfer
	this.fileTransfer = new FileTransfer();	
	this.fileRoot = "";
	this.directoryEntry = null;
	/**
	 * creation de fichier/dossier sur le device
	 */
	this.downloadFile = function(url) {		
		// processus de creation d'un fichier telecharger
		this.fileTransfer.download(url, this.fileRoot + "/test.png", function(
				entry) {
			console.log("download complete: " + entry.fullPath);
		}, function(error) {
			console.log("download error source " + error.source);
			console.log("download error target " + error.target);
			console.log("upload error code" + error.code);
		}, false);
	};
	/**
	 * récupération de fichier dossier au niveau du device
	 */
	this.getFile = function() {
		// acces au fichiers de données
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
				this.onSuccessGetFile, this.onErrorGetFile);
	}
	/**
	 * exécuter lors de la récupération d'un fichier de données
	 */
	this.onSuccessGetFile = function(fileSystem) {		
		var s = new FileDataManager().getInstance();
		s.directoryEntry = fileSystem.root;
		s.fileRoot = fileSystem.root.fullPath;
	}
	/**
	 * Gestion des erreurs si un dossier n'existe pas
	 */
	this.onErrorGetFile = function(fileEntry) {
		console.log(fileEntry);
	}

	/**
	 * recuperation de l instance courante
	 */
	this.getInstance = function() {
		if (typeof manager == "undefined") {
			manager = new FileDataManager();
		}
		return manager;
	}

	/**
	 * creation d'un dossier de stockage
	 */
	this.createFolder = function(folderName) {
		var s = new FileDataManager().getInstance();
		var success = function() {
			alert("success");
		};
		var error = function() {
			alert("error");
		};		
		s.directoryEntry.getDirectory("updateVersion", {
			create : true,
			exclusive : false
		}, success, error);
	}
}