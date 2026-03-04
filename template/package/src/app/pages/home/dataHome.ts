export const rutaImagen: string = 'assets/images/home/Personalizada.png';
export const logoProyecto: string = 'assets/images/logos/logo-dark.svg';

export const nombreAplicacion: string = 'Paymentorderservice';
export const descripcionAplicacion: string = 'Payment Order Service es una API REST de Spring Boot que administra las órdenes de pago, permitiendo a los usuarios crear pedidos, adjuntar archivos de factura (PDF o imágenes), aprobarlos o rechazarlos y notificar a un sistema externo tras la aprobación.';

export const sliderConfig = {
  imagenes: [
    {src: rutaImagen, alt: 'Imagen 1'},
    {src: rutaImagen, alt: 'Imagen 2'},
    {src: rutaImagen, alt: 'Imagen 3'},
  ],
  effecto: 'cube' as const,
  autoplayDelay: 5000,
  mostrarNavegacion: true,
  mostrarPaginacion: true,
  loop: true
};

export const dataCards = [
  {
    imagen: rutaImagen,
    titulo: 'Ejemplo de Card',
    descripcion: 'Esta es una descripción de ejemplo para la card. Utiliza la misma imagen en todas las secciones.'
  },
  {
    imagen: rutaImagen,
    titulo: 'Card Adicional 1',
    descripcion: 'Descripción adicional para demostrar varias cards en la galería.'
  },
  {
    imagen: rutaImagen,
    titulo: 'Card Adicional 2',
    descripcion: 'Otra descripción de ejemplo para ver cómo se ve en galería.'
  },
  {
    imagen: rutaImagen,
    titulo: 'Card Adicional 3',
    descripcion: 'Contenido de ejemplo para la cuarta card en la galería.'
  }
];

export const textoIzquierda: string = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec
  ullamcorper lectus. Phasellus imperdiet nulla non sapien venenatis,
  nec porta dui aliquet. Aliquam erat volutpat. Integer vestibulum
  purus sit amet semper ornare. Curabitur ac massa at mauris condimentum
  placerat. Vestibulum commodo leo sit amet turpis vestibulum, in rutrum
  purus elementum. Etiam non odio sit amet sapien ullamcorper tempor.
`;

export const textoDerecha: string = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec
  dolor vitae justo cursus aliquet. Sed tristique magna id congue
  vestibulum. Fusce laoreet aliquam dolor quis venenatis. Integer tempor
  lectus nec sapien fermentum, nec luctus justo facilisis. Pellentesque
  habitant morbi tristique senectus et netus et malesuada fames ac turpis
  egestas. Donec vitae leo mollis, faucibus mauris in, vehicula ex.
`;
