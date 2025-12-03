import { computed, type Ref } from "vue"
import type { SelectedFiltersStore, GameOffersSelectedFiltersState } from "@/features/filters/interface/FiltersStore"
import type { Offer } from "@/entities/domain_stores/model/Offer"
import { matchesRangeFilter, matchesMultiStringFilter } from "@/features/filters/lib/filtersMatching"


export const useSortedFilter = (
	gameOffersSelectedFilters: Ref<SelectedFiltersStore<GameOffersSelectedFiltersState>>,
	offers: Ref<Offer[] | undefined>
) => {
	const filtersState = computed(() => {
		const {sort, ...filtersState} = gameOffersSelectedFilters.value

		return filtersState
	})

	const offersFiltered = computed(() => {
		if (!offers.value) return undefined

		const filters = filtersState.value

		const offersFiltered = offers.value.filter((offer) => {
			if (filters.price) {
				if (!matchesRangeFilter(filters.price, offer.price)) return false
			}
			if (filters.store) {
				if (!matchesMultiStringFilter(filters.store, offer.store)) return false
			}
			if (filters.platform) {
				if (!matchesMultiStringFilter(filters.platform, offer.platform)) return false
			}

			return true
		})

		return offersFiltered
	})

	const sortFilterState = computed(() => gameOffersSelectedFilters.value.sort)

	const offersSorted = computed(() => {
		if (offersFiltered.value == undefined) return undefined

		if (sortFilterState.value == "cheap") return [...offersFiltered.value].sort((a, b) => a.price - b.price)
		if (sortFilterState.value == "expensive") return [...offersFiltered.value].sort((a, b) => b.price - a.price)

		return offersFiltered.value
	})

	return offersSorted
}