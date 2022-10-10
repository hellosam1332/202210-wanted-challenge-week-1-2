import {render, screen} from "@testing-library/react";
import PostNavigation from "./PostNavigation";

const mockPosts = ['sample-post-1', 'sample-post-2','sample-post-3']

describe('PostNavigation', () => {
  const renderComponent = () => render(<PostNavigation posts={mockPosts}/>)

  it('render header', () => {
    renderComponent();

    const heading = screen.getByRole('heading', {name: /Posts:/i});

    expect(heading).toBeInTheDocument();
  })
})
