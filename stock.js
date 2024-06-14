document.addEventListener('DOMContentLoaded', () => {
    // Initialize stock items from localStorage or default values
    let stockItems = JSON.parse(localStorage.getItem('stockItems')) || [
        { id: 1, name: 'Item A', quantity: 10, logs: [] },
        { id: 2, name: 'Item B', quantity: 15, logs: [] },
        { id: 3, name: 'Item C', quantity: 20, logs: [] }
    ];

    const stockList = document.getElementById('stockList');

    // Function to render stock items
    const renderStockItems = () => {
        stockList.innerHTML = '';
        stockItems.forEach(item => {
            // Ensure logs is an array to avoid undefined issues
            if (!Array.isArray(item.logs)) {
                item.logs = [];
            }
            const div = document.createElement('div');
            div.classList.add('stock-item');
            div.innerHTML = `
                <span class="item-name">${item.name}</span>
                <div class="quantity-control">
                    <button class="btn btn-sm btn-primary" onclick="decreaseQuantity(${item.id})">-</button>
                    <input type="text" class="quantity-input" id="quantity${item.id}" value="${item.quantity}" readonly>
                    <button class="btn btn-sm btn-primary" onclick="increaseQuantity(${item.id})">+</button>
                </div>
                <button class="log-button" onclick="toggleLogs(${item.id})">Show Logs</button>
                <div class="logs" id="logs${item.id}">
                    ${item.logs.map(log => `<p class="log">${log}</p>`).join('')}
                </div>
            `;
            stockList.appendChild(div);
        });
    };

    // Function to save stock items to localStorage
    const saveToLocalStorage = () => {
        localStorage.setItem('stockItems', JSON.stringify(stockItems));
    };

    // Function to increase quantity
    window.increaseQuantity = (itemId) => {
        const item = stockItems.find(i => i.id === itemId);
        if (item) {
            item.quantity++;
            item.logs.push(`Added 1 to quantity (${new Date().toLocaleString()})`);
            saveToLocalStorage();
            renderStockItems();
        }
    };

    // Function to decrease quantity
    window.decreaseQuantity = (itemId) => {
        const item = stockItems.find(i => i.id === itemId);
        if (item && item.quantity > 0) {
            item.quantity--;
            item.logs.push(`Removed 1 from quantity (${new Date().toLocaleString()})`);
            saveToLocalStorage();
            renderStockItems();
        }
    };

    // Function to toggle logs visibility
    window.toggleLogs = (itemId) => {
        const logsDiv = document.getElementById(`logs${itemId}`);
        logsDiv.style.display = logsDiv.style.display === 'none' || logsDiv.style.display === '' ? 'block' : 'none';
    };

    // Add event listener to clear storage button
    //=document.getElementById('clearStorageButton').addEventListener('click', () => {
        //=localStorage.clear();
        //=alert('Local storage has been cleared');
        // Reload the page to reset the stock items
        //=window.location.reload();
    //=});

    // Initial render
    renderStockItems();
});
