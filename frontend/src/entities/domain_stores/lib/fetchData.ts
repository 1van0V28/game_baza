import type { IDomainStore } from "@/entities/domain_stores/interface/DomainStore"
import type { Ref } from "vue"


export const fetchData = async <T>(domainStore: IDomainStore<T>, fetchAPI: () => Promise<T>) => {
	domainStore.setIsPending(true)
	try {
		const data = await fetchAPI()
		domainStore.setData(data)
	}
	catch (error) {
		console.log(error)
		const errorMessage = error instanceof Error ? error.message : String(error)
		domainStore.setError(errorMessage)
	}
	finally {
		domainStore.setIsPending(false)
	}
}


export const updateFetchDataController = (abortController: Ref<AbortController | undefined>) => {
	if (abortController.value) {
		console.log("fetchDataAbort")
		abortController.value.abort()
	}
	
	abortController.value = new AbortController()
	
	return abortController.value
}