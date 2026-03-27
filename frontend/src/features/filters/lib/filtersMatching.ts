import type { RangeFilterValue, MultiStringFilterValue } from "../interface/FiltersStore"


export const matchesRangeFilter = (filterValue: RangeFilterValue, checkValue: number) => {
	const [min, max] = filterValue
	return (checkValue >= min && checkValue <= max)
}


export const matchesMultiStringFilter = (filterValue: MultiStringFilterValue, checkValue: string) => {
	return (filterValue[checkValue] || !Boolean(Object.keys(filterValue).length))
}