use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod quest_calculator {
    use super::*;
    pub fn create(ctx: Context<Create>, init_message: String) -> Result<()> {
        let calculator_account = &mut ctx.accounts.calculator_account;
        calculator_account.greeting = init_message;
        Ok(())
    }

    pub fn add(ctx: Context<Add>, num1: i64, num2: i64) -> Result<()> {
        let calculator_account = &mut ctx.accounts.calculator_account;
        calculator_account.result = num1 + num2;
        Ok(())
    }

    pub fn multiply(ctx: Context<Multiply>, num1: i64, num2: i64) -> Result<()> {
        let calculator_account = &mut ctx.accounts.calculator_account;
        calculator_account.result = num1 * num2;
        Ok(())
    }

    pub fn subtract(ctx: Context<Subtract>, num1: i64, num2: i64) -> Result<()> {
        let calculator_account = &mut ctx.accounts.calculator_account;
        calculator_account.result = num1 - num2;
        Ok(())
    }

    pub fn divide(ctx: Context<Divide>, num1: i64, num2: i64) -> Result<()> {
        let calculator_account = &mut ctx.accounts.calculator_account;
        calculator_account.result = num1 / num2;
        calculator_account.remainder = num1 % num2;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = user, space = 8 + 64 + 64 + 64 + 64)]
    pub calculator_account: Account<'info, CalculatorAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Add<'info> {
    #[account(mut)]
    pub calculator_account: Account<'info, CalculatorAccount>,
}

#[derive(Accounts)]
pub struct Multiply<'info> {
    #[account(mut)]
    pub calculator_account: Account<'info, CalculatorAccount>,
}

#[derive(Accounts)]
pub struct Subtract<'info> {
    #[account(mut)]
    pub calculator_account: Account<'info, CalculatorAccount>,
}

#[derive(Accounts)]
pub struct Divide<'info> {
    #[account(mut)]
    pub calculator_account: Account<'info, CalculatorAccount>,
}

#[account]
pub struct CalculatorAccount {
    pub greeting: String,
    pub result: i64,
    pub remainder: i64,
}
