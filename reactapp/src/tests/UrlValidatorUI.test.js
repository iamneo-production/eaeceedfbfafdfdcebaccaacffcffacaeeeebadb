import UrlValidator from "../components/UrlValidator/UrlValidator";
import { render, screen, cleanup, fireEvent } from '@testing-library/react';

describe('Test URL Validator', () => {

    test('testcase1', () => {
        render(<UrlValidator />);

        const inputDomain = screen.getByTestId('domain');
        const inputPath = screen.getByTestId('path');
        const inputMethod = screen.getByTestId('method');
        const inputBody = screen.getByTestId('body');

        const form = screen.getByTestId('submit');

        expect(inputDomain).toBeTruthy();
        expect(inputPath).toBeTruthy();
        expect(inputMethod).toBeTruthy();
        expect(inputBody).toBeTruthy();

        
        fireEvent.submit(form, {
            target : [
                {value : 'www.google.com'},
                {value : 'search all'},
                {value : 'GET'},
                {value : ''},
                
            ]
        });

        const message = screen.getByTestId('message');
        expect(message.textContent).toBe('www.google.com/search/all');

    });

    test('testcase2', () => {
        render(<UrlValidator />);

        const inputDomain = screen.getByTestId('domain');
        const inputPath = screen.getByTestId('path');
        const inputMethod = screen.getByTestId('method');
        const inputBody = screen.getByTestId('body');

        const form = screen.getByTestId('submit');

        expect(inputDomain).toBeTruthy();
        expect(inputPath).toBeTruthy();
        expect(inputMethod).toBeTruthy();
        expect(inputBody).toBeTruthy();

        
        fireEvent.submit(form, {
            target : [
                {value : 'www.google.com'},
                {value : 'search all'},
                {value : 'GET'},
                {value : '{\"Name\":\"Max\"}'},
                
            ]
        });

        const message = screen.getByTestId('message');
        expect(message.textContent).toBe('www.google.com/search/all?Name=Max');

    });

    test('testcase3', () => {
        render(<UrlValidator />);

        const form = screen.getByTestId('submit');
        const inputMethod = screen.getByTestId('method');

        fireEvent.change(inputMethod, {target : {value : 'POST'}})
        
        fireEvent.submit(form, {
            target : [
                {value : 'www.google.com'},
                {value : 'posts'},
                {value : 'POST'},
                {value : '{\"Name\":\"Max\"}'}
            ]
        });

        const message = screen.getByTestId('message');
        expect(message.textContent).toBe('www.google.com/posts');

    })


    test('testcase4', () => {
        render(<UrlValidator />);

        const inputDomain = screen.getByTestId('domain');
        const inputPath = screen.getByTestId('path');
        const inputMethod = screen.getByTestId('method');
        const body = screen.getByTestId('body');

        const form = screen.getByTestId('submit');
        
        fireEvent.change(inputDomain, {target : {value: 'www.google.com'}});
        fireEvent.change(inputPath, {target : {value: 'search all'}});
        fireEvent.change(inputMethod, {target : {value: 'POST'}});
        
        fireEvent.submit(form, {
            target : [
                {value : 'www.google.com'},
                {value : 'search all'},
                {value : 'POST'},
                {value : ''},
                
            ]
        });

        const message = screen.getByTestId('message');
        expect(message.textContent).toBe('Error in the Body');

    })

    test('testcase5', () => {
        render(<UrlValidator />);

        const form = screen.getByTestId('submit');
        const inputMethod = screen.getByTestId('method');

        fireEvent.change(inputMethod, {target : {value : 'DELETE'}})
        
        fireEvent.submit(form, {
            target : [
                {value : 'www.google.com'},
                {value : 'posts'},
                {value : 'DLETE'},
                {value : ''}
            ]
        });

        const message = screen.getByTestId('message');
        expect(message.textContent).toBe('www.google.com/posts');

    });

    test('testcase6', () => {
        render(<UrlValidator />);

        const inputDomain = screen.getByTestId('domain');
        const inputPath = screen.getByTestId('path');
        const inputMethod = screen.getByTestId('method');
        const inputBody = screen.getByTestId('body');

        const form = screen.getByTestId('submit');

        expect(inputDomain).toBeTruthy();
        expect(inputPath).toBeTruthy();
        expect(inputMethod).toBeTruthy();
        expect(inputBody).toBeTruthy();

        
        fireEvent.submit(form, {
            target : [
                {value : 'www.google.com'},
                {value : 'search all'},
                {value : 'GET'},
                {value : '{\"Name\":\"Max\"'},
                
            ]
        });

        const message = screen.getByTestId('message');
        expect(message.textContent).toBe('Error in the Body of the Query Params');

    });

})