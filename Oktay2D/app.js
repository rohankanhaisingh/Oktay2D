const electron = require("electron"),
    path = require("path"),
    url = require("url"),
    express = require("express"),
    cors = require("cors");

const { app, BrowserWindow, ipcMain } = electron;

// Mutable variable.
let mainBrowserWindow = null;




app.once("ready", function (ElectronApplicationReadyState) {

    mainBrowserWindow = new BrowserWindow({
        width: 700,
        height: 840,
        minWidth: 700,
        minHeight: 840,
        backgroundColor: "#fff",
        title: "Oktay2D",
        icon: path.join(__dirname, "public", "resources", "oktay2d_logo.png"),
        autoHideMenuBar: true,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            nodeIntegrationInSubFrames: true,
            nodeIntegrationInWorker: true,
            webgl: true,
            webSecurity: true,
        }
    });

    mainBrowserWindow.loadURL(url.format({
        pathname: path.join(__dirname, "public", "index.html"),
        slashes: true,
        protocol: "file:"
    }));


});