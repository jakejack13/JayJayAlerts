//@ts-check

const { QMainWindow, QLabel } = require("@nodegui/nodegui");

exports.WindowWrapper = class {
    constructor() {
        this.win = new QMainWindow();
        this.win.setObjectName("root");
        this.win.setStyleSheet(`
        #root {
            background-color: green;
        }
        `);
        global.win = this.win;
        this.win.show();
    };

    /**
     * Display the username and message on the screen
     * @param {string} username the username to display on the screen
     * @param {string} message the message to accompany the username
     */
    display(username, message="") {
        let label = new QLabel();
        setTimeout(function() {
            label.setText(message + username);
            label.setInlineStyle("color: black;")
        }, 5000);
        label.close();
    };
};