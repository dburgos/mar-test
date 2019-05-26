export default function formatThousands(number) {
  return number.toString().replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}