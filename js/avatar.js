
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview > img');

const fileChooserRoom = document.querySelector('.ad-form__upload input[type=file]');
const previewRoom = document.querySelector('.ad-form__photo');


const addFile = (input) => {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    if (input === fileChooserAvatar) {
      previewAvatar.src = URL.createObjectURL(file);
    } else {
      const roomPhoto = document.createElement('img');
      roomPhoto.style.height = '70px';
      roomPhoto.style.width = '70px';
      roomPhoto.setAttribute('src', 'images/hydrangeas.jpg');
      roomPhoto.src = URL.createObjectURL(file);
      previewRoom.appendChild(roomPhoto);
    }
  }
};


fileChooserRoom.addEventListener('change', () => addFile(fileChooserRoom));

fileChooserAvatar.addEventListener('change', () => addFile(fileChooserAvatar));
