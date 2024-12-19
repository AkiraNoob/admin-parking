import OpenCage from 'opencage-api-client';

export async function getCoordinateByAddress(
  address: string
): Promise<{ lat: string; lng: string }> {
  return OpenCage.geocode({
    q: address,
    key: 'a277c8be2780407da23160b5d6d894e5',
  })
    .then((data) => {
      return data?.results?.[0]?.geometry;
    })
    .catch((err) => {
      throw err;
    });
}
