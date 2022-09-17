
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview > img');

const fileChooserRoom = document.querySelector('.ad-form__upload input[type=file]');
const previewRoom = document.querySelector('.ad-form__photo');


fileChooserAvatar.addEventListener('change', () => {
  const file = fileChooserAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewAvatar.src = URL.createObjectURL(file);
  }
});


fileChooserRoom.addEventListener('change', () => {
  const file = fileChooserRoom.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const roomPhoto = document.createElement('img');
    roomPhoto.style.height = '70px';
    roomPhoto.style.width = '70px';
    roomPhoto.setAttribute('src', 'images/hydrangeas.jpg');
    roomPhoto.src = URL.createObjectURL(file);
    previewRoom.appendChild(roomPhoto);
  }
});

