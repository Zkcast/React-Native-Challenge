import React from 'react'
import Home from '../screens/Home'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'

describe('Home test', () => {

    it('Should render boards', () => {
        const mockData = [
            {
                id: '124124124',
                name: 'Board1',
                prefs: {
                    backgroundImageScaled: [{}, {}, {}, { url: 'https://example.com/image1' }],
                },
            }
        ]

        const page = render(
            <NavigationContainer>
                <Home  testBoards={mockData} />
            </NavigationContainer>,
        )

        const enterOnBoardButton = page.queryByTestId('navigateButton')
        expect(enterOnBoardButton).not.toBeNull()
    })


    it('Should render in less than 5 seconds', async () => {
        const { getByTestId } = render(
            <NavigationContainer>
                <Home />
            </NavigationContainer>);
        const homeComponent = getByTestId('home-component');

        await waitFor(() => {
            expect(homeComponent).toBeTruthy();
        }, { timeout: 5000 });
    });

})