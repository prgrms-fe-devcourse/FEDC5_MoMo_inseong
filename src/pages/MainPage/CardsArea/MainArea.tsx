import styled from '@emotion/styled';
import { useState } from 'react';
import { ScheduledMain } from './ScheduledMain';
import { WhenCards } from './WhenCards';
import { Tab } from '@common/Tab/Tab';

export const MainArea = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div>
      <StTabsWrapper>
        <Tab
          label="언제 모일래?"
          width={200}
          isActive={selectedTab === 0}
          isJustify={false}
          handleTabClick={() => setSelectedTab(0)}
        />
        <Tab
          label="이날 모일래?"
          width={200}
          isActive={selectedTab === 1}
          isJustify={false}
          handleTabClick={() => setSelectedTab(1)}
        />
      </StTabsWrapper>
      <div>{selectedTab === 0 ? <WhenCards /> : <ScheduledMain />}</div>
    </div>
  );
};

const StTabsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
