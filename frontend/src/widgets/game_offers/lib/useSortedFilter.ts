import type { SelectedFiltersStore, GameOffersSelectedFiltersState } from "@/features/filters/interface/FiltersStore"
import type { Offer } from "@/entities/domain_stores/model/Offer"
import { computed } from "vue"
import { matchesRangeFilter, matchesMultiStringFilter } from "@/features/filters/lib/filtersMatching"


export const useSortedFilter = (
	gameOffersSelectedFilters: SelectedFiltersStore<GameOffersSelectedFiltersState>,
	offers: Offer[] | undefined
) => {
	const filtersState = computed(() => {
		const {sort, ...filtersState} = gameOffersSelectedFilters

		return filtersState
	})

	const offersFiltered = computed(() => {
		if (!offers) return undefined

		const filters = filtersState.value

		const offersFiltered = offers.filter((offer) => {
			if (filters.price_discount) {
				if (!matchesRangeFilter(filters.price_discount, offer.price_discount)) return false
			}
			if (filters.stores) {
				if (!matchesMultiStringFilter(filters.stores, offer.store)) return false
			}

			return true
		})

		return offersFiltered
	})

	const sortFilterState = computed(() => gameOffersSelectedFilters.sort)

	const offersSorted = computed(() => {
		if (offersFiltered.value == undefined) return undefined

		if (sortFilterState.value == "cheap") return [...offersFiltered.value].sort(
			(a, b) => a.price_discount - b.price_discount
		)
		if (sortFilterState.value == "expensive") return [...offersFiltered.value].sort(
			(a, b) => b.price_discount - a.price_discount
		)

		return offersFiltered.value
	})

	return offersSorted
}