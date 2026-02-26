export default {
  name: 'beverage',
  title: 'Напій',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Назва',
      type: 'string',
    },
    {
      name: 'type',
      title: 'Тип',
      type: 'string',
      options: {
        list: [
          {title: 'Soft', value: 'soft'},
          {title: 'Bières', value: 'beer'},
          {title: 'Vin', value: 'wine'},
        ],
      },
    },
    {
      name: 'price',
      title: 'Ціна (€)',
      type: 'number',
    },
  ],
}
