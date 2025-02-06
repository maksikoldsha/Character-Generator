// Store currently selected clothing items
const selectedClothing = {
    top: null,
    bottom: null,
    shoes: null,
    accessories: null,
    outfit: null
};

// Handle tab switching
document.querySelector('.nav-bar').addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'BUTTON') {
        const target = e.target.tagName === 'IMG' ? e.target.parentElement : e.target;
        const tabId = target.getAttribute('data-tab');
        
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Show selected tab content
        document.getElementById(tabId).classList.add('active');
        
        // Update button styles
        document.querySelectorAll('.nav-bar button').forEach(btn => {
            btn.querySelector('.nav-icon').classList.remove('active');
        });
        target.querySelector('.nav-icon').classList.add('active');
    }
});

// Handle clothing selection
document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('click', () => {
        const category = tile.closest('.tab-content').id;
        const imgSrc = tile.querySelector('img').src;
        const itemName = tile.querySelector('.tile-overlay h3').textContent;
        
        // Determine which layer to update based on the category
        let layerId;
        switch(category) {
            case 'tab1': // Tops
                layerId = 'top-layer';
                selectedClothing.top = { src: imgSrc, name: itemName };
                break;
            case 'tab2': // Bottoms
                layerId = 'bottom-layer';
                selectedClothing.bottom = { src: imgSrc, name: itemName };
                break;
            case 'tab3': // Shoes
                layerId = 'shoes-layer';
                selectedClothing.shoes = { src: imgSrc, name: itemName };
                break;
            case 'tab4': // Accessories
                layerId = 'accessories-layer';
                selectedClothing.accessories = { src: imgSrc, name: itemName };
                break;
            case 'tab5': // Complete outfits
                selectedClothing.outfit = { src: imgSrc, name: itemName };
                // Clear individual selections when choosing a complete outfit
                Object.keys(selectedClothing).forEach(key => {
                    if (key !== 'outfit') {
                        selectedClothing[key] = null;
                        const layer = document.getElementById(`${key}-layer`);
                        if (layer) {
                            clearLayer(layer);
                        }
                    }
                });
                updateOutfitLayer(imgSrc);
                return;
        }
        
        if (layerId) {
            updateClothingLayer(layerId, imgSrc);
        }

        // Update character preview title with current selection
        updatePreviewTitle();
    });
});

// Function to update clothing layer
function updateClothingLayer(layerId, imgSrc) {
    const layer = document.getElementById(layerId);
    if (!layer) return;
    
    clearLayer(layer);
    
    // Add new image
    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.opacity = '0';
    layer.appendChild(img);
    
    // Fade in the new image
    requestAnimationFrame(() => {
        img.style.opacity = '1';
    });
}

// Function to update complete outfit
function updateOutfitLayer(imgSrc) {
    const layers = ['top-layer', 'bottom-layer', 'shoes-layer', 'accessories-layer'];
    layers.forEach(layerId => {
        const layer = document.getElementById(layerId);
        if (layer) {
            clearLayer(layer);
        }
    });
    
    // Update the outfit layer
    const outfitLayer = document.getElementById('outfit-layer');
    if (outfitLayer) {
        updateClothingLayer('outfit-layer', imgSrc);
    }
}

// Function to clear a layer
function clearLayer(layer) {
    while (layer.firstChild) {
        layer.firstChild.remove();
    }
}

// Function to update preview title
function updatePreviewTitle() {
    const previewTitle = document.querySelector('.character-preview h2');
    if (!previewTitle) return;

    // Добавляем outfit если он выбран
    if (selectedClothing.outfit) {
        selectedItems.push(selectedClothing.outfit.name);
    }

    // Добавляем остальные предметы одежды
    Object.entries(selectedClothing).forEach(([key, value]) => {
        if (value && key !== 'outfit') {
            selectedItems.push(value.name);
        }
    });

    // Обновляем заголовок
    if (selectedItems.length > 0) {
        previewTitle.textContent = selectedItems.join(' + ');
    } else {
        const selections = [];
        if (selectedClothing.top) selections.push(selectedClothing.top.name);
        if (selectedClothing.bottom) selections.push(selectedClothing.bottom.name);
        if (selectedClothing.shoes) selections.push(selectedClothing.shoes.name);
        if (selectedClothing.accessories) selections.push(selectedClothing.accessories.name);
        
        previewTitle.textContent = selections.length > 0 
            ? `Preview: ${selections.join(' + ')}` 
            : 'Character Preview';
    }
}

// Initialize the first tab as active
document.querySelector('.nav-bar button[data-tab="tab1"] .nav-icon').classList.add('active');
document.getElementById('tab1').classList.add('active');
