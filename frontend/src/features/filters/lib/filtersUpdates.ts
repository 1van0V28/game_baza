export function updateMultiSelectorValue(
	modelValue: Record<string, true> | undefined,
	filter: { value: string, isActive: boolean }
) {
	const newModelValue = modelValue 
		? { ...modelValue }
		: {} as Record<string, true>

	if (filter.isActive) {
		newModelValue[filter.value] = true
	} else {
		delete newModelValue[filter.value]
	}

	return newModelValue
}