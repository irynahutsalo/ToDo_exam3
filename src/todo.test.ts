import { Selector } from 'testcafe';

fixture('Todo App E2E Tests')
    .page('http://localhost:5173'); 

test('Should add a todo item successfully', async t => {
    const todoInput = Selector('#todo-input');
    const addButton = Selector('button').withText('Add');
    const todoItem = Selector('.todo-item').withText('Learn TestCafe');

    await t
        .typeText(todoInput, 'Learn TestCafe')
        .click(addButton)
        .expect(todoItem.exists).ok();
});