self.onmessage = (event) => {
    if (event.data.action === 'openPopup') {
        clients.openWindow('/index.html');
    }
};