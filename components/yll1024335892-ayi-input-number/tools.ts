function getTag(value) {
	if (value == null) {
		return value === undefined ? "[object Undefined]" : "[object Null]"
	}
	return toString.call(value)
}

function isObjectLike(value) {
	return typeof value === "object" && value !== null
}

export function isNumber(value) {
	return typeof value === "number" || (isObjectLike(value) && getTag(value) == "[object Number]")
}

export function isString(value) {
	return typeof value === "string"
}

// 是否小数
export function isDecimal(value): boolean {
	return String(value).length - String(value).indexOf(".") + 1 > 0
}

export function isBoolean(value) {
	return typeof value === "boolean"
}

export function isArray(value) {
	return Array.isArray(value)
}
export function setRpx(val : any) : string {
	return isArray(val) ? val.map(setRpx).join(" ") : isNumber(val) ? `${val}rpx` : val
}