// import React from 'react'
// import { shallow } from 'enzyme'
// import NewComment from './NewComment'

// describe('<New Comment />', () => {
//     it('should handle changes in textarea', () => {
//       const wrapper = shallow(<NewComment />)
//       const event =  { 
//           target: {value: 'test'}
//       }
//       wrapper.find('textarea').simulate('change', event)
//     //   console.log(wrapper.state())
//       expect(wrapper.state().newComment).toBe('test')
//     })
//     it('should call sendComment on button click ', () => {
//       // criar função falsa 'mock' com jest.fn()
//       const sendComment = jest.fn()
//       const wrapper = shallow(<NewComment sendComment={sendComment} />)
//       const event =  { 
//           target: {value: 'test'}
//       }
//       wrapper.find('textarea').simulate('change', event)
//       wrapper.find('button').simulate('click')
//       // Confere como é criar a função falsa e o que valores transmite no caso value: 'test'
//       // console.log(sendComment)
//       // console.log(sendComment.mock.calls)

//       // Métodos de validar chamada da função ciick e suas açoes de inserir dados e limpar state
//       expect(sendComment).toBeCalled()
//       expect(sendComment).toBeCalledWith('test')
//       expect(sendComment.mock.calls[0][0]).toBe('test')
//       expect(wrapper.state().newComment).toBe('')
//     })
// })