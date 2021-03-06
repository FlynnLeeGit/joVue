import { joFetch } from 'jo'
const sudokuServer = `${window.config.server}/sudoku`

export default {
  /** [getSudokus 获取所有九宫格服务] */
  getSudokus() {
      return joFetch.post(`${sudokuServer}/ser/select`)
        .then(res => res.list)
    },
    /** [insertSudoku 插入九宫格服务] */
    insertSudoku(sudokuJson) {
      return joFetch.post(`${sudokuServer}/ser/insert`, { sudoku: JSON.stringify(sudokuJson) })

    },
    /** [getOneSudoku 获取单个九宫格服务] */
    getOneSudoku(sudokuId) {
      return joFetch.post(`${sudokuServer}/ser/selectOne`, { sudokuId })
        .then(res => JSON.parse(res.Sudoku))

    },
    /** [deleteSudoku 删除九宫格服务] */
    deleteSudoku(sudokuId) {
      return joFetch.delete(`${sudokuServer}/ser/delete`, { sudokuId })
    },
    /** [updateSudoku 更新九宫格服务] */
    updateSudoku(sudokuJson) {
      return joFetch.post(`${sudokuServer}/ser/update`, { sudoku: JSON.stringify(sudokuJson) })
    }
}
