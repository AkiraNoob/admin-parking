import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';

interface IGetProvinceResponse {
  total: number;
  data: {
    id: string;
    name: string;
    type: number;
    typeText: string;
    slug: string;
  }[];
}

interface IGetDistrictResponse {
  total: number;
  data: {
    id: string;
    name: string;
    type: number;
    typeText: string;
    provinceId: string;
  }[];
}

interface IGetWardResponse {
  total: number;
  data: {
    id: string;
    name: string;
    type: number;
    typeText: string;
    districtId: string;
  }[];
}

const useAddress = ({ provinceId, districtId }: { provinceId: string; districtId: string }) => {
  const provinceQueryReturn = useInfiniteQuery<
    IGetProvinceResponse,
    Error,
    IGetProvinceResponse['data'],
    QueryKey,
    number
  >({
    queryKey: ['province_list'],
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      const currentFetched = allPages.reduce(
        (previous, current) => previous + current.data.length,
        0
      );

      if (currentFetched < lastPage.total) return lastPageParam + 1;
      return null;
    },
    select(data) {
      return data.pages.map((item) => item.data).flat();
    },
    queryFn: ({ pageParam }) =>
      fetch(`https://open.oapi.vn/location/provinces?page=${pageParam}&size=10`, {
        method: 'GET',
      }).then((res) => res.json()) as Promise<IGetProvinceResponse>,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const districtQueryReturn = useInfiniteQuery<
    IGetDistrictResponse,
    Error,
    IGetDistrictResponse['data'],
    QueryKey,
    number
  >({
    queryKey: ['district_list', provinceId],
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      const currentFetched = allPages.reduce(
        (previous, current) => previous + current.data.length,
        0
      );

      if (currentFetched < lastPage.total) return lastPageParam + 1;
      return null;
    },
    select(data) {
      return data.pages.map((item) => item.data).flat();
    },
    queryFn: ({ pageParam }) =>
      fetch(`https://open.oapi.vn/location/districts/${provinceId}?page=${pageParam}&size=30`, {
        method: 'GET',
      }).then((res) => res.json()) as Promise<IGetDistrictResponse>,
    enabled: !!provinceId,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const wardQueryReturn = useInfiniteQuery<
    IGetWardResponse,
    Error,
    IGetWardResponse['data'],
    QueryKey,
    number
  >({
    queryKey: ['ward_list', districtId],
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      const currentFetched = allPages.reduce(
        (previous, current) => previous + current.data.length,
        0
      );

      if (currentFetched < lastPage.total) return lastPageParam + 1;
      return null;
    },
    select(data) {
      return data.pages.map((item) => item.data).flat();
    },
    queryFn: ({ pageParam }) =>
      fetch(`https://open.oapi.vn/location/wards/${districtId}?page=${pageParam}&size=30`, {
        method: 'GET',
      }).then((res) => res.json()) as Promise<IGetWardResponse>,
    enabled: !!districtId,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return { provinceQueryReturn, districtQueryReturn, wardQueryReturn };
};

export default useAddress;
