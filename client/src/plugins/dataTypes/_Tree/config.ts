import { DTDefinition } from '~types/dataTypes';

const definition: DTDefinition = {
	fieldGroup: 'other',
	fieldGroupOrder: 30,
	schema: {
		title: 'Tree',
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			autoIncRowNum: {
				type: 'integer'
			},
			maxSiblings: {
				type: 'integer',
				minimum: 1
			}
		},
		required: [
			'autoIncRowNum',
			'maxSiblings'
		]
	}
};

export default definition;
