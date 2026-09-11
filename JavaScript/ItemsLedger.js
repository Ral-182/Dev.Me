const equipmentLedger = {
  1: {
    type: "PC",
    status: "CheckedOut",
    borrower: { name: "John Smith", email: "john@acme.org" },
    dueDate: "11/30/2025",
  },
  2: {
    type: "Laptop",
    status: "CheckedIn",
    borrower: { name: "", email: "" },
    dueDate: "",
  },
  3: {
    type: "Laptop",
    status: "CheckedOut",
    borrower: { name: "Jane Doe", email: "jane@acme.org" },
    dueDate: "10/31/2025",
  },
  4: {
    type: "iPad",
    status: "CheckedIn",
    borrower: { name: "", email: "" },
    dueDate: "",
  },
};

function checkoutDevice(ledger, assetTag, borrower) {
  const updatedLedger = structuredClone(ledger);

  if (!updatedLedger[assetTag]) {
    return {
      ledger: updatedLedger,
      message: `Asset ${assetTag} was not found.`,
    };
  }

  if (updatedLedger[assetTag].status === "CheckedOut") {
    return {
      ledger: updatedLedger,
      message: `Asset ${assetTag} is already checked out.`,
    };
  }

  updatedLedger[assetTag].borrower.name = borrower.name;
  updatedLedger[assetTag].borrower.email = borrower.email;
  updatedLedger[assetTag].status = "CheckedOut";

  return {
    ledger: updatedLedger,
    message: `Asset ${assetTag} checked out to ${borrower.name}.`,
  };
}

function checkinDevice(ledger, assetTag) {
  const updatedLedger = structuredClone(ledger);

  if (!updatedLedger[assetTag]) {
    return {
      ledger: updatedLedger,
      message: `Asset ${assetTag} was not found.`,
    };
  }

  if (updatedLedger[assetTag].status === "CheckedIn") {
    return {
      ledger: updatedLedger,
      message: `Asset ${assetTag} is already checked in.`,
    };
  }

  updatedLedger[assetTag].borrower.name = "";
  updatedLedger[assetTag].borrower.email = "";
  updatedLedger[assetTag].dueDate = "";
  updatedLedger[assetTag].status = "CheckedIn";

  return {
    ledger: updatedLedger,
    message: `Asset ${assetTag} has successfully checked in.`,
  };
}
function listOverdueDevices(ledger, today) {
  function toComparableDate(date) {
    const [month, day, year] = date.split("/");

    return Number(year + month.padStart(2, "0") + day.padStart(2, "0"));
  }

  const todayValue = toComparableDate(today);

  const overdueDevices = Object.values(ledger).filter((device) => {
    return (
      device.status === "CheckedOut" &&
      toComparableDate(device.dueDate) < todayValue
    );
  });

  overdueDevices.sort((a, b) => {
    return toComparableDate(a.dueDate) - toComparableDate(b.dueDate);
  });

  return overdueDevices;
}

function serializeLedger() {}
function loadLedger() {}
