import React from 'react';
import { Collapse, Divider } from 'antd';

const questions = [
  {
    key: '1',
    label: 'What is Answerly?',
    children: (
      <p>
        Answerly is a collaborative platform where users can post and answer academic doubts, helping each other grow.
      </p>
    ),
  },
  {
    key: '2',
    label: 'How do I earn points?',
    children: (
      <p>
        You earn points by answering doubts posted by other users. Higher-quality answers may give more points.
      </p>
    ),
  },
  {
    key: '3',
    label: 'Can I edit my doubt after posting?',
    children: (
      <p>
        Yes, you can edit or delete your doubts from the "My Doubts" section at any time.
      </p>
    ),
  },
  {
    key: '4',
    label: 'What are streaks and how do they work?',
    children: (
      <p>
        Streaks reward consistency. Answering at least one doubt per day maintains your streak and boosts your credibility.
      </p>
    ),
  },
  {
    key: '5',
    label: 'Is there any moderation for the answers?',
    children: (
      <p>
        Yes, all content is community-moderated, and inappropriate answers can be reported and reviewed by moderators.
      </p>
    ),
  },
];

const CustomCollapse = () => {
  return (
    <div className="collapseMain" style={{ height: '60vh', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', margin:'0',padding:'0' }}>Frequently Asked Questions</h1>
      <Divider orientation="left" >
      </Divider>
      <Collapse
        accordion
        size="large"
        items={questions}
        className="space-y-4"
      />
    </div>
  );
};

export default CustomCollapse;
