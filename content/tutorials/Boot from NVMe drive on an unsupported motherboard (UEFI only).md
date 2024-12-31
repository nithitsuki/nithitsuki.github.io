---
title: Boot from NVMe drive on an unsupported motherboard (UEFI only) ((draft, needs polishing))
tags:
  - website/tutorials
---
If your motherboard does not support booting from a PCIe slot, \
But you've got one of those "nvme to pcie x1 adapter" and are surprised that it doesn't work\
Well, consider yourself lucky! (If your motherboard has UEFI that is)\
Since we can use a small workaround to chainload the bootloader/kernel on the pcie slot drive\
using a uefi bootloader on another boot drive that is supported (such as a sata hdd).\
Here's how I did it using rEFInd on a sata hdd and booted into a pcie slot drive on a 3rd gen intel mobo
  
-----------

#### Step 1: Make Sure you're not stupid
Make sure that:
+ your NVMe/PCIe Slot drive is recognised:\
by booting into an os from another drive (like a live_usb or an internal hdd) and making sure that your pcie drive is detected, and working as intended

#### Step 2: Install an OS on the Nvme/PCIe Drive
Make sure that:
+ your NVMe/PCIe Slot drive is recognised:\
by booting into an os from another drive (like a live_usb or an internal hdd) and making sure that your pcie drive is detected, and working as intended
