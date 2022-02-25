const assert = require("assert")
const anchor = require("@project-serum/anchor")
const { SystemProgram } = anchor.web3

describe("quest-calculator", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env()
  anchor.setProvider(provider)

  const calculatorAccount = anchor.web3.Keypair.generate()
  const program = anchor.workspace.QuestCalculator

  it("Creates a calculator", async () => {
    await program.rpc.create("Welcome to Solana", {
      accounts: {
        calculatorAccount: calculatorAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [calculatorAccount],
    })

    const account = await program.account.calculatorAccount.fetch(
      calculatorAccount.publicKey
    )
    assert.ok(account.greeting === "Welcome to Solana")
  })

  it("Adds two numbers", async () => {
    await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculatorAccount: calculatorAccount.publicKey,
      },
    })

    const account = await program.account.calculatorAccount.fetch(
      calculatorAccount.publicKey
    )
    assert.ok(account.result.eq(new anchor.BN(5)))
    assert.ok(account.greeting === "Welcome to Solana")
  })

  it("Multiplies two numbers", async () => {
    await program.rpc.multiply(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculatorAccount: calculatorAccount.publicKey,
      },
    })

    const account = await program.account.calculatorAccount.fetch(
      calculatorAccount.publicKey
    )
    assert.ok(account.result.eq(new anchor.BN(6)))
    assert.ok(account.greeting === "Welcome to Solana")
  })

  it("Subtract two numbers", async () => {
    await program.rpc.subtract(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculatorAccount: calculatorAccount.publicKey,
      },
    })

    const account = await program.account.calculatorAccount.fetch(
      calculatorAccount.publicKey
    )
    assert.ok(account.result.eq(new anchor.BN(-1)))
    assert.ok(account.greeting === "Welcome to Solana")
  })

  it("Divides two numbers", async () => {
    await program.rpc.divide(new anchor.BN(10), new anchor.BN(3), {
      accounts: {
        calculatorAccount: calculatorAccount.publicKey,
      },
    })

    const account = await program.account.calculatorAccount.fetch(
      calculatorAccount.publicKey
    )
    assert.ok(account.result.eq(new anchor.BN(3)))
    assert.ok(account.remainder.eq(new anchor.BN(1)))
    assert.ok(account.greeting === "Welcome to Solana")
  })
})
