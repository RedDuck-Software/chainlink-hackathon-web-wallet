import { ChevronDown, Menu } from 'lucide-react';
import React, { useCallback, useMemo, useState } from 'react';
import { ScrollArea } from '../../../components/scroll-area';
import { Button } from '../../../components/button';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '../../../components/dropdown';
import { cn } from '../../../lib/utils/cn';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../components/popover';
import { useNavigate } from 'react-router-dom';
import { UIRoutes } from '../../../lib/popup-routes';
import { useUserAccounts } from '../../hooks/read/use-user-accounts';
import { useCurrentNetwork } from '../../hooks/read/use-current-network';
import { useSwitchWallet } from '../../hooks/mutations/use-switch-wallet';
import { getAddress } from 'ethers/lib/utils';

const Header = () => {
  const [networkOpened, setNetworkOpened] = useState(false);
  const { data: currentNetwork } = useCurrentNetwork();
  const { data } = useUserAccounts();

  return (
    <div className="py-[18px] bg-white px-[24px] items-center justify-between shadow-sm flex">
      <div className="flex items-center gap-[16px]">
        <img src="/assets/main_logo_small.svg" alt="logo" />
        {data?.selectedAccount?.isConnected ? (
          <div className="flex items-center gap-[4px]">
            <div className="bg-success rounded-full w-[8px] h-[8px]" />
            <div className="text-[12px] leading-[20px] text-success">
              Connected
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-[4px] cursor-pointer">
            <div className="bg-error rounded-full w-[8px] h-[8px]" />
            <div className="text-[12px] leading-[20px] text-error">
              Not Connected
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-[24px] text-primary">
        <DropdownMenu open={networkOpened} onOpenChange={setNetworkOpened}>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-[8px] cursor-pointer">
              <div>{currentNetwork?.name}</div>
              <div>
                <ChevronDown
                  size={16}
                  className={cn(
                    'transition-all',
                    networkOpened && 'rotate-180'
                  )}
                />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Sepolia</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Menu size={16} className="cursor-pointer" />
      </div>
    </div>
  );
};

const SubHeader = () => {
  const { data } = useUserAccounts();
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [smartWalletSelectOpened, setSmartWalletSelectOpened] = useState(false);
  const { mutateAsync: switchWallet } = useSwitchWallet();
  const onSmartWalletItemClick = useCallback(
    async (i: any) => {
      let id = i?.target?.id;

      if (id === 'no-smart-wallet') {
        id = data?.selectedAccount?.masterWallet!;
      }

      if (
        !id ||
        getAddress(id) === getAddress(data?.selectedAccount?.address!)
      ) {
        return;
      }

      await switchWallet({ switchTo: id });
    },
    [data]
  );

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-[24px] pt-[24px] pb-[16px] border-b-[1px] border-[#1C1F5A] border-opacity-[0.08]">
      <div className="flex gap-[8px]">
        <div className="text-[12px] leading-[20px] font-medium">
          Master account:
        </div>
        <div className="text-[12px] leading-[20px] text-muted-foreground">
          {data?.selectedAccount?.isSmartContract
            ? data?.selectedAccount?.masterWallet!
            : data?.selectedAccount?.address!}
        </div>
      </div>
      <div className="flex gap-[8px]">
        {data?.selectedAccountSmartWallets?.length === 0 ? (
          <Popover open={popoverOpened} onOpenChange={setPopoverOpened}>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-[4px] cursor-pointer">
                <div className="bg-error rounded-full w-[8px] h-[8px]" />
                <div className="text-[12px] leading-[20px] text-error">
                  Not deployed
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="rounded-[4px] py-[8px] px-[16px] flex flex-col gap-[16px] border-none max-w-[290px] w-full ml-[40px]">
              <div className="flex gap-[8px]">
                <img src="/assets/icon_warning.svg" alt="warning" />
                <div className="text-[12px] leading-[20px] text-muted-foreground">
                  Your acount is not activated yet. Please generate Smart
                  Contract to activate it.
                </div>
              </div>
              <div className="flex gap-[8px]">
                <Button
                  variant="outline"
                  className="py-[4px] px-[17px] text-[16px] leading-[24px] rounded-[8px] flex-1"
                  onClick={() => setPopoverOpened(false)}
                >
                  Ask me later
                </Button>
                <Button
                  className="py-[4px] px-[17px] text-[16px] leading-[24px] rounded-[8px] flex-1"
                  onClick={() => navigate(`/${UIRoutes.generateContract.path}`)}
                >
                  Activate
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="text-[12px] leading-[20px] text-muted-foreground">
            <DropdownMenu
              open={smartWalletSelectOpened}
              onOpenChange={setSmartWalletSelectOpened}
            >
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-[8px] cursor-pointer">
                  <div>
                    {data?.selectedAccount?.isSmartContract
                      ? data?.selectedAccount.address
                      : '-'}
                  </div>
                  <div>
                    <ChevronDown
                      size={16}
                      className={cn(
                        'transition-all',
                        smartWalletSelectOpened && 'rotate-180'
                      )}
                    />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  id={'no-smart-wallet'}
                  onClick={onSmartWalletItemClick}
                >
                  -
                </DropdownMenuItem>
                {data?.selectedAccountSmartWallets?.map((s) => (
                  <DropdownMenuItem
                    id={s.address}
                    onClick={onSmartWalletItemClick}
                  >
                    {s.address}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};

const Balance = () => {
  const { data } = useUserAccounts();
  const { data: currentNetwork } = useCurrentNetwork();

  return (
    <div className="flex flex-col items-center gap-[16px] mt-[24px]">
      <img src="/assets/icon_ethereum.svg" alt="ethereum" />
      <div className="text-[32px] leading-[40px] font-medium">
        {data?.selectedAccount?.balanceNative} {currentNetwork?.nativeSymbol}
      </div>
      <div className="text-[16px] leading-[24px] text-muted-foreground">
        $206.00
      </div>
    </div>
  );
};

const Main = () => {
  const items = useMemo(() => {
    return [
      {
        title: 'Account rental',
        icon: '/assets/account_rental.svg',
        onClick: () => {},
      },
      {
        title: 'NFT rental',
        icon: '/assets/nft_rental.svg',
        onClick: () => {},
      },
      {
        title: 'Account transfer',
        icon: '/assets/account_transfer.svg',
        onClick: () => {},
      },
      {
        title: 'Transaction automation',
        icon: '/assets/transaction_automation.svg',
        onClick: () => {},
      },
    ];
  }, []);

  return (
    <div className="grid grid-cols-2 gap-y-[24px] px-[24px] self-center mt-[48px] justify-items-center">
      {items.map(({ title, icon, onClick }) => (
        <div
          key={title}
          className="p-[16px] flex flex-col gap-[16px] items-center bg-white w-[170px] h-[176px] cursor-pointer"
          onClick={onClick}
        >
          <div className="text-[16px] leading-[24px] font-medium text-center">
            {title}
          </div>
          <img src={icon} alt={title} />
        </div>
      ))}
    </div>
  );
};

const Buttons = () => {
  return (
    <div className="flex items-center gap-[24px] mt-[54px] justify-center mb-[30px]">
      <Button variant="outline" className="max-w-[170px] w-full">
        Deposit
      </Button>
      <Button className="max-w-[170px] w-full">Transfer</Button>
    </div>
  );
};

export const HomePage = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <ScrollArea className="h-[540px]">
        <SubHeader />
        <Balance />
        <Main />
        <Buttons />
      </ScrollArea>
    </div>
  );
};
