export function getRandomColor() {
  const availableCharacters = '0123456789ABCDEF';
  const availableCharacterLength = availableCharacters.length;

  let color = '';

  for (let i = 0; i < 6; i++) {
    color +=
      availableCharacters[Math.floor(Math.random() * availableCharacterLength)];
  }

  return color;
}
