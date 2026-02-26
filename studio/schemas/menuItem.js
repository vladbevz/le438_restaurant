export default {
  name: 'menuItem',
  title: 'Страва',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Назва',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Категорія',
      type: 'reference',
      to: [{type: 'category'}],
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Опис',
      type: 'text'
    },
    {
      name: 'price',
      title: 'Ціна (€)',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'image',
      title: 'Фото',
      type: 'image',
      options: {hotspot: true}
    },
    {
      name: 'ingredients',
      title: 'Інгредієнти',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'isVegetarian',
      title: 'Вегетаріанська',
      type: 'boolean'
    }
  ]
}