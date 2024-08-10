type Address = {
	street: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
};

type Customer = {
	id: number;
	name: string;
	title: string; // This can be extended if there are more titles.
	address: Address;
};

type CustomerList = {
	customers: Customer[];
};

export type { Address, Customer, CustomerList };
