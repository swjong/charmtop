const baseFontSize = 16;
let currentSize = parseInt(localStorage.getItem('userFontSize')) || baseFontSize;

function updateFontSize() {
  // Remove fixed heights and adjust layout
  const containers = document.querySelectorAll('.row.items-center');
  containers.forEach(container => {
    container.style.display = 'flex';
    container.style.flexDirection = 'row';
    container.style.alignItems = 'flex-start';
  });

  // Adjust content column
  const contentColumns = document.querySelectorAll('.lg\\:col-6.md\\:col-8');
  contentColumns.forEach(column => {
    column.style.height = 'auto';
    column.style.overflow = 'visible';
  });

  // Target content elements
  const contentElements = document.querySelectorAll('.content, .post-content, .blog-content, main p, article p, .section p');
  contentElements.forEach(element => {
    if (!element.closest('nav, .navbar, .navigation, header')) {
      element.style.fontSize = `${currentSize}px`;
      element.style.lineHeight = '1.5';
    }
  });
  
  localStorage.setItem('userFontSize', currentSize);
}

function increaseFont() {
  if (currentSize < 24) {
    currentSize += 2;
    updateFontSize();
  }
}

function decreaseFont() {
  if (currentSize > 12) {
    currentSize -= 2;
    updateFontSize();
  }
}

function resetFont() {
  currentSize = baseFontSize;
  updateFontSize();
}

// Initialize font size on page load
document.addEventListener('DOMContentLoaded', updateFontSize);