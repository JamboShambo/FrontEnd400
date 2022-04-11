const style1 = [
  {
    featureType: "administrative",
    elementType: "all",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

const style2 = [
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#444444",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        color: "#f2f2f2",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        saturation: 0,
      },
      {
        lightness: 0,
      },
    ],
  },

  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#46bcec",
      },
      {
        visibility: "on",
      },
    ],
  },
];

const style3 = [
  {
    featureType: "all",
    elementType: "labels",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      {
        saturation: 36,
      },
      {
        color: "#000000",
      },
      {
        lightness: 40,
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#000000",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 17,
      },
      {
        weight: 1.2,
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#e5c163",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#c4c4c4",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#e5c163",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 21,
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.business",
    elementType: "geometry",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#e5c163",
      },
      {
        lightness: "0",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#e5c163",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 18,
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#575757",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#2c2c2c",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#999999",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 19,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 17,
      },
    ],
  },
];

const style4 = [
  {
    elementType: "geometry",
    stylers: [
      {
        hue: "#ff4400",
      },
      {
        saturation: -68,
      },
      {
        lightness: -4,
      },
      {
        gamma: 0.72,
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry",
    stylers: [
      {
        hue: "#0077ff",
      },
      {
        gamma: 3.1,
      },
    ],
  },
  {
    featureType: "water",
    stylers: [
      {
        hue: "#00ccff",
      },
      {
        gamma: 0.44,
      },
      {
        saturation: -33,
      },
    ],
  },
  {
    featureType: "poi.park",
    stylers: [
      {
        hue: "#44ff00",
      },
      {
        saturation: -23,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        hue: "#007fff",
      },
      {
        gamma: 0.77,
      },
      {
        saturation: 65,
      },
      {
        lightness: 99,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        gamma: 0.11,
      },
      {
        weight: 5.6,
      },
      {
        saturation: 99,
      },
      {
        hue: "#0091ff",
      },
      {
        lightness: -86,
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        lightness: -48,
      },
      {
        hue: "#ff5e00",
      },
      {
        gamma: 1.2,
      },
      {
        saturation: -23,
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.stroke",
    stylers: [
      {
        saturation: -64,
      },
      {
        hue: "#ff9100",
      },
      {
        lightness: 16,
      },
      {
        gamma: 0.47,
      },
      {
        weight: 2.7,
      },
    ],
  },
];

const style5 = [
  {
    elementType: "geometry",
    stylers: [
      {
        hue: "#ff4400",
      },
      {
        saturation: -68,
      },
      {
        lightness: -4,
      },
      {
        gamma: 0.72,
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry",
    stylers: [
      {
        hue: "#0077ff",
      },
      {
        gamma: 3.1,
      },
    ],
  },
  {
    featureType: "water",
    stylers: [
      {
        hue: "#00ccff",
      },
      {
        gamma: 0.44,
      },
      {
        saturation: -33,
      },
    ],
  },
  {
    featureType: "poi.park",
    stylers: [
      {
        hue: "#44ff00",
      },
      {
        saturation: -23,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        hue: "#007fff",
      },
      {
        gamma: 0.77,
      },
      {
        saturation: 65,
      },
      {
        lightness: 99,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        gamma: 0.11,
      },
      {
        weight: 5.6,
      },
      {
        saturation: 99,
      },
      {
        hue: "#0091ff",
      },
      {
        lightness: -86,
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        lightness: -48,
      },
      {
        hue: "#ff5e00",
      },
      {
        gamma: 1.2,
      },
      {
        saturation: -23,
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.stroke",
    stylers: [
      {
        saturation: -64,
      },
      {
        hue: "#ff9100",
      },
      {
        lightness: 16,
      },
      {
        gamma: 0.47,
      },
      {
        weight: 2.7,
      },
    ],
  },
];

export { style1, style2, style3, style4, style5 };
