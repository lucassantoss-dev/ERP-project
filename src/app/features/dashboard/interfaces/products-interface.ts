export interface ProductsInterface {
	_id: string,
    name: string,
	description: string,
	price: number,
	productStock: number,
	categoryId: string,
	provider: string,
	active: boolean,
	image: string,
	attributes: string,
	selectedItemCount: number
}