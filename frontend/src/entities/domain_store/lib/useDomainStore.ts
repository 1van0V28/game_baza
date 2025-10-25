import { ref } from "vue"


export const useDomainStore = <T>() => {
	const data = ref<T | null>(null)
	const error = ref<string | null>(null)
	const isPending = ref(false)


	function setData(newData: T | null) {
		data.value = newData
	}

	function setError(newError: string | null) {
		error.value = newError
	}

	function setIsPending(newIsPending: boolean) {
		isPending.value = newIsPending
	}


	return { 
		data, error, isPending,
		setData,
		setError,
		setIsPending,
	}
}