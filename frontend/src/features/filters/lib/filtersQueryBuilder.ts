import { TypeFilter, 
	type SelectedFiltersStates, 
	type SelectedFiltersStore,
	type RangeFilterValue,
} from "../interface/FiltersStore"
import type { FiltersDefinitions } from "../interface/FilterDefinition"


export function filtersQueryBuilder<T extends SelectedFiltersStates>(
	selectedFiltersState: SelectedFiltersStore<T>,
	filtersDefinition: FiltersDefinitions<T>[][]
): string {
	const queryParams = new URLSearchParams()

	filtersDefinition.forEach((defintiionList) => {
		defintiionList.forEach((definition) => {
			const filterName = String(definition.name)
			const filterValue = selectedFiltersState[definition.name]

			if (!filterValue) return

			switch (definition.type) {
				case TypeFilter.MultiSelectorString: {
					Object.entries(filterValue).forEach(([key, value]) => {
						if (!value) return
						queryParams.append(filterName, key)
					})
					break
				}
				case TypeFilter.MonoSelectorString: {
					queryParams.append(filterName, String(filterValue))
					break
				}
				case TypeFilter.MonoSelectorRange: {
					const filterValueRange = filterValue as RangeFilterValue
					queryParams.append(`${filterName}_min`, String(filterValueRange[0]))
					queryParams.append(`${filterName}_max`, String(filterValueRange[1]))
					break
				}
			}
		})
	})

	return queryParams.toString()
}