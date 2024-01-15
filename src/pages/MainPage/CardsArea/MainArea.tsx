import styled from '@emotion/styled';
import { useState } from 'react';
import { ScheduledMain } from './ScheduledMain';
import { UnsheduledCards } from './UnsheduledCards';
import { getItem, setItem } from '@/utils/storage';
import { Tab } from '@common/index';

export const MainArea = () => {
  const [, setSelectedTab] = useState(getItem('mainTab', 0));
  const handleTabChange = (tab: number) => {
    setSelectedTab(tab);
    setItem('mainTab', tab);
  };
  return (
    <div>
      <StTabsWrapper>
        <Tab
          label="언제 모일래?"
          width={200}
          isActive={getItem('mainTab', 0) === 0}
          isJustify={false}
          handleTabClick={() => handleTabChange(0)}
        />
        <Tab
          label="이날 모일래?"
          width={200}
          isActive={getItem('mainTab', 0) === 1}
          isJustify={false}
          handleTabClick={() => handleTabChange(1)}
        />
      </StTabsWrapper>
      <div>
        {getItem('mainTab', 0) === 0 ? <UnsheduledCards /> : <ScheduledMain />}
      </div>
    </div>
  );
};

const StTabsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
