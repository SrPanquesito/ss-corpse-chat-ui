import React from 'react';
import { render, screen } from '@testing-library/react';
import ImagePreviewDisplayAbsolute from 'components/ImagePreviewDisplayAbsolute';
import { useAbsolute } from 'providers/absolute';

jest.mock('providers/absolute');

describe('ImagePreviewDisplayAbsolute', () => {
    const mockUseAbsolute = {
        showImagePreviewDisplay: true,
        positionCoordsImagePreviewDisplay: [100, 100],
        dataImagePreviewDisplay: []
    };

    beforeEach(() => {
        useAbsolute.mockReturnValue(mockUseAbsolute);
    });

    test('renders correctly', () => {
        render(<ImagePreviewDisplayAbsolute />);
        const wrapperElement = screen.getByRole('dialog');
        expect(wrapperElement).toBeInTheDocument();
    });

    test('renders correctly but is hidden when showImagePreviewDisplay is false', () => {
        useAbsolute.mockReturnValue({
            ...mockUseAbsolute,
            showImagePreviewDisplay: false
        });

        render(<ImagePreviewDisplayAbsolute />);
        const wrapperElement = screen.getByRole('dialog');
        expect(wrapperElement).toBeInTheDocument();
    });

    test('displays loading message when there are no images', () => {
        render(<ImagePreviewDisplayAbsolute />);
        const loadingMessage = screen.getByText(/Loading images.../i);
        expect(loadingMessage).toBeInTheDocument();
    });

    test('displays images when they are provided', () => {
        const images = ['image1.png', 'image2.png'];
        useAbsolute.mockReturnValue({
            ...mockUseAbsolute,
            dataImagePreviewDisplay: images
        });

        render(<ImagePreviewDisplayAbsolute />);
        const imageElements = screen.getAllByRole('img');
        expect(imageElements.length).toBe(images.length);
    });
});