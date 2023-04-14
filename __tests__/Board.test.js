import React from 'react';
import { render, getAllByTestId, waitFor, getByTestId } from '@testing-library/react-native';
import Board from '../screens/Board';
import { NavigationContainer } from '@react-navigation/native';



const mockBoard = {
    id: '124124124',
    name: 'Board1',
    prefs: {
        backgroundImageScaled: [{}, {}, {}, { url: 'https://example.com/image1' }],
    },
}


const mockedLists = [
    {
        id: 1,
        name: 'list1'
    },
    {
        id: 2,
        name: 'list2'
    },
    {
        id: 3,
        name: 'list3'
    },
]


describe('Board screen', () => {

    it('Renders add list button correctly', () => {

        const mockedParams = {
            route: { params: { boardId: '6437776258d163026713feea' } },
            navigation: ''
        };

        const page = render(
            <NavigationContainer>
                <Board {...mockedParams} mockBoard={mockBoard} />
            </NavigationContainer>)
        const addListButton = page.getByTestId('addListButton')

        expect(addListButton).toBeTruthy();

    });


    it('should render 3 list components in less than three seconds', async () => {
        const mockedParams = {
            route: { params: { boardId: '6437776258d163026713feea' } },
            navigation: ''
        };

        const page = render(
            <NavigationContainer>
                <Board {...mockedParams} mockBoard={mockBoard} mockedLists={mockedLists} />
            </NavigationContainer>
        );


        await waitFor(() => {
            const listComp = page.queryAllByTestId('listComponent')
            expect(listComp.length).toBe(3);
        }, { timeout: 3000 });


    });


});