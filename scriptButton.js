document.addEventListener('DOMContentLoaded', () => {
  const panelButton = document.querySelector('.panel-button');
  const slidingPanel = document.querySelector('.sliding-panel');
  const closeButton = document.querySelector('.sliding-panel .close-button');

  // Function to open the panel
  const openPanel = () => {
      slidingPanel.classList.add('active');
      panelButton.classList.add('hidden');
  };

  // Function to close the panel
  const closePanel = () => {
      slidingPanel.classList.remove('active');
      panelButton.classList.remove('hidden');
  };

  // Event listener for opening the panel
  panelButton.addEventListener('click', openPanel);

  // Event listener for closing the panel
  closeButton.addEventListener('click', closePanel);

  // Event listener for closing the panel when clicking outside it
  document.addEventListener('click', (event) => {
      // Check if the click is outside the panel and not on the panel button
      if (!slidingPanel.contains(event.target) && !panelButton.contains(event.target)) {
          closePanel();
      }
  });
});