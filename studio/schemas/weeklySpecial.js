export default {
  name: 'weeklySpecial',
  title: 'Страва тижня',
  type: 'document',
  fields: [
    {
      name: 'dish',
      title: 'Страва',
      type: 'reference',
      to: [{type: 'menuItem'}],
    },
    {
      name: 'weekStartDate',
      title: 'Початок тижня',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'weekEndDate',
      title: 'Кінець тижня',
      type: 'date',
    },
    {
      name: 'specialPrice',
      title: 'Спеціальна ціна',
      type: 'number',
    },
  ],
}
