
// JavaScript for ground venue detail page

document.addEventListener('DOMContentLoaded', function() {
  // Get the venue ID from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const venueId = urlParams.get('id');
  
  // If no venue ID is provided, redirect to grounds page
  if (!venueId) {
    window.location.href = 'grounds.html';
    return;
  }
  
  // Find the venue data
  const venue = venueData.grounds.find(ground => ground.id === venueId);
  
  // If venue not found, redirect to grounds page
  if (!venue) {
    window.location.href = 'grounds.html';
    return;
  }
  
  // Update page content with venue data
  document.title = `${venue.name} - WeddingSreni Mumbai`;
  
  // Update header
  document.getElementById('venueName').textContent = venue.name;
  document.getElementById('venueNameBreadcrumb').textContent = venue.name;
  
  // Update venue details
  document.getElementById('venueTitle').textContent = venue.title;
  document.getElementById('venueCapacity').textContent = venue.capacity;
  document.getElementById('venueTheme').textContent = venue.theme;
  document.getElementById('venueLocation').textContent = venue.location;
  document.getElementById('venueArea').textContent = venue.area;
  document.getElementById('venueDescription').textContent = venue.description;
  
  // Update carousel
  const carouselInner = document.getElementById('venueCarouselInner');
  venue.images.forEach((image, index) => {
    const carouselItem = document.createElement('div');
    carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
    
    const img = document.createElement('img');
    img.src = image;
    img.className = 'd-block w-100';
    img.alt = `${venue.name} - Image ${index + 1}`;
    
    carouselItem.appendChild(img);
    carouselInner.appendChild(carouselItem);
  });
  
  // Update features
  const featuresContainer = document.getElementById('venueFeatures');
  venue.features.forEach(feature => {
    const featureCol = document.createElement('div');
    featureCol.className = 'col-md-4 col-lg-4 mb-4';
    
    featureCol.innerHTML = `
      <div class="feature-card h-100">
        <div class="feature-icon text-center mb-3">
          <i class="fas fa-${feature.icon} fa-2x text-gold"></i>
        </div>
        <h3 class="h5 text-maroon text-center mb-2">${feature.title}</h3>
        <p class="text-center mb-0">${feature.description}</p>
      </div>
    `;
    
    featuresContainer.appendChild(featureCol);
  });
  
  // Update gallery
  const galleryContainer = document.getElementById('venueGallery');
  venue.images.forEach((image, index) => {
    const galleryCol = document.createElement('div');
    galleryCol.className = 'col-md-4 col-lg-4 mb-4';
    
    galleryCol.innerHTML = `
      <div class="gallery-item">
        <a href="${image}" data-lightbox="venue-gallery" data-title="${venue.name} - Image ${index + 1}">
          <img src="${image}" alt="${venue.name} - Image ${index + 1}" class="img-fluid rounded shadow">
        </a>
      </div>
    `;
    
    galleryContainer.appendChild(galleryCol);
  });
  
  // Initialize lightbox if available
  if (typeof lightbox !== 'undefined') {
    lightbox.option({
      'resizeDuration': 200,
      'wrapAround': true,
      'albumLabel': 'Image %1 of %2'
    });
  }
});
