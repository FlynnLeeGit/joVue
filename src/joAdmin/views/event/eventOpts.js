const convertCaozuo = () => {
  return `<button data-type='edit' class='btn btn-default btn-xs'>编辑</button>
  <button data-type='stockEdit' class='btn btn-default btn-xs'>库存编辑</button>
<button data-type='down' class='btn btn-warning btn-xs'>下线</button>
	`
}

export const eventTableOpts = {
  columns: [
    { th: '编号Id', field: 'eventId' },
    { th: '活动名称', field: 'name' },
    { th: '活动时间', field: 'timeLabel' },
    { th: '操作', convert: convertCaozuo }
  ]
}
